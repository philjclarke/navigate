import { useState } from 'react';
import type { AnswerValue, Survey } from '../survey/types';
import { Shell, type ShellMode } from './Shell';
import { Invitation } from './Invitation';
import { SurveyWizard } from './SurveyWizard';
import { PrizeDraw, type PrizeContact } from './PrizeDraw';
import { ThankYou } from './ThankYou';

// 'started' = closed part-way through (can be resumed); only 'declined'
// (the explicit "No thanks") should hide the homepage panel.
export type CloseReason = 'completed' | 'declined' | 'remind' | 'started';

type Stage = 'invitation' | 'survey' | 'prizedraw' | 'thankyou';

// Snapshot of in-progress state so the survey can be resumed where left off.
export interface SurveyProgress {
  stage: Stage;
  index: number;
  answers: Record<string, AnswerValue>;
  contact?: PrizeContact;
}

// Orchestrates the full student journey. The invitation is always the supplied
// modal; the survey/prize-draw/thank-you render inside the chosen shell.
export function SurveyFlow({
  survey,
  mode,
  contained = false,
  initial,
  onClose,
}: {
  survey: Survey;
  mode: ShellMode;
  contained?: boolean;
  initial?: SurveyProgress; // when resuming, start here instead of the invitation
  onClose: (reason: CloseReason, progress?: SurveyProgress) => void;
}) {
  const [stage, setStage] = useState<Stage>(initial?.stage ?? 'invitation');
  const [index, setIndex] = useState(initial?.index ?? 0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>(initial?.answers ?? {});
  const [contact, setContact] = useState<PrizeContact | undefined>(initial?.contact);

  const total = survey.questions.length;
  const setAnswer = (id: string, value: AnswerValue) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const handleNext = () => {
    if (index + 1 < total) setIndex(index + 1);
    else if (survey.prizeDraw?.enabled) setStage('prizedraw');
    else setStage('thankyou');
  };

  const handleBack = () => {
    if (index === 0) setStage('invitation');
    else setIndex(index - 1);
  };

  // Closing part-way through: keep progress so the homepage panel can offer
  // "Resume survey". Does not count as declining.
  const exitStarted = (current: Stage) => onClose('started', { stage: current, index, answers, contact });

  // The invitation is its own centered modal (matches the supplied design).
  if (stage === 'invitation') {
    return (
      <Invitation
        survey={survey}
        contained={contained}
        onTakePart={() => {
          setIndex(0);
          setStage('survey');
        }}
        // Dismissing the popup (X or "Remind me next time") keeps the panel;
        // only "No thanks" declines.
        onDismiss={() => onClose('remind')}
        onDecline={() => onClose('declined')}
      />
    );
  }

  return (
    <Shell mode={mode} ariaLabel={survey.title} contained={contained}>
      {stage === 'survey' && (
        <SurveyWizard
          survey={survey}
          index={index}
          answers={answers}
          onAnswer={setAnswer}
          onNext={handleNext}
          onBack={handleBack}
          onExit={() => exitStarted('survey')}
        />
      )}

      {stage === 'prizedraw' && (
        <PrizeDraw
          totalSteps={total}
          onBack={() => setStage('survey')}
          onExit={() => exitStarted('prizedraw')}
          onContinue={(c) => {
            setContact(c);
            setStage('thankyou');
          }}
          onSkip={() => {
            setContact(undefined);
            setStage('thankyou');
          }}
        />
      )}

      {stage === 'thankyou' && (
        <ThankYou
          survey={survey}
          enteredPrizeDraw={!!(contact?.email || contact?.mobile)}
          onFinish={() => onClose('completed', { stage: 'thankyou', index, answers, contact })}
        />
      )}
    </Shell>
  );
}
