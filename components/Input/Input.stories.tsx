import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    font: {
      control: 'select',
      options: ['ui', 'mono'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'input-default',
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
      <Input id="s-normal" label="Normal" placeholder="Placeholder" />
      <Input id="s-error" label="With error" placeholder="Bad value" error="This field is required" />
      <Input id="s-disabled" label="Disabled" placeholder="Can't edit" disabled />
      <Input id="s-password" label="Password" type="password" placeholder="Enter password" />
    </div>
  ),
};

export const MonoFont: Story = {
  args: {
    id: 'input-mono',
    label: 'API Key',
    font: 'mono',
    placeholder: 'sk-...',
  },
};
