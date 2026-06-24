import type { QuestionInputProps } from './types';
import { ChoiceList } from './ChoiceList';
import { Rating } from './Rating';
import { TextInput } from './TextInput';
import { NumericInput } from './NumericInput';
import { Dropdown } from './Dropdown';

const YESNO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

// Single switch from question type → input component.
export function QuestionRenderer(props: QuestionInputProps) {
  const { question } = props;
  switch (question.type) {
    case 'single':
      return <ChoiceList {...props} options={question.options ?? []} />;
    case 'multiple':
      return <ChoiceList {...props} multiple options={question.options ?? []} />;
    case 'yesno':
      return <ChoiceList {...props} options={YESNO} />;
    case 'rating':
      return <Rating {...props} />;
    case 'short-text':
      return <TextInput {...props} />;
    case 'long-text':
      return <TextInput {...props} multiline />;
    case 'numeric':
      return <NumericInput {...props} />;
    case 'dropdown':
      return <Dropdown {...props} />;
    default:
      return null;
  }
}
