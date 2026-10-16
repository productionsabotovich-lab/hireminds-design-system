import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Field } from './Field';

const meta: Meta<typeof Field> = {
  title: 'Atoms/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  args: {
    id: 'field-email',
    label: 'Work email',
    type: 'email',
    placeholder: 'you@company.com',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field id="f-normal" label="Username" placeholder="john_doe" />
      <Field id="f-error" label="Email" placeholder="bad value" error="Invalid email address" />
      <Field id="f-disabled" label="Account ID" placeholder="acc_xxx" disabled />
    </div>
  ),
};
