import { Story, Meta } from '@storybook/angular/types-6-0';
import { InputComponent } from './input.component';

export default {
  title: 'Components/Input',
  component: InputComponent,
  argTypes: {
    isInvalid: {
      control: 'boolean',
      description: 'Shows whether input is valid or not, is used when user types wrong information or fails authentication'
    },
    placeholder: {
      control: 'text',
      description: 'Text showing when input is empty'
    },
    Text: {
      control: 'text',
      description: 'A text that must be typed in input'
    },
    Type: {
      control: 'radio',
      description: 'Type of input to use'
    }
  },
} as Meta;

const template: Story = args =>({
  props:{
    ...args
  }
})

export const Default = template.bind({})
