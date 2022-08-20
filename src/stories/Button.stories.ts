import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent } from './button.component';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  argTypes: {
    value: {
      control: 'text'
    }
  },
} as Meta;

const template: Story = args =>({
  props:{
    ...args
  }
})

export const Default = template.bind({})
