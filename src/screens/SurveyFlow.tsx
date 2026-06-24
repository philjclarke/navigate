import { useState } from 'react';
import type { AnswerValue, Survey } from '../survey/types';
import { Shell, type ShellMode } from './Shell';
import { Invitation } from './Invitation';
import { SurveyWizard } from './SurveyWizard';
import { PrizeDraw, type PrizeContact } from './PrizeDraw';
import { ThankYou } from './ThankYou';

export type CloseReason = 'completed' | 'declined' | 'remind';

type Stage = 'invitation' | 'survey' | 'prizedraw' | 'thankyou';

// Orchestrates the full student journey. The invitation is always the supplied
// modal; the survey/prize-draw/thank-you render inside the chosen shell.
export function SurveyFlow({
  survey,
  mode,
  contained = false,
  onClose,
}: {
  survey: Survey;
  mode: ShellMode;
  contained?: boolean;
  onClose: (reason: CloseReason, data?: { answers: Record<string, AnswerValue>; contact?: PrizeContact }) => void;
}) {
  const [stage, setStage] = useState<Stage>('invitation');
  const [index, setIndex] = useState(0); // lifted so Back from prize draw resumes
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [contact, setContact] = useState<PrizeContact | undefined>(undefined);

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
        onRemind={() => onClose('remind')}
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
          onExit={() => setStage('invitation')}
        />
      )}

      {stage === 'prizedraw' && (
        <PrizeDraw
          totalSteps={total}
          onBack={() => setStage('survey')}
          onExit={() => setStage('invitation')}
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
          onFinish={() => onClose('completed', { answers, contact })}
        />
      )}
    </Shell>
  );
}
