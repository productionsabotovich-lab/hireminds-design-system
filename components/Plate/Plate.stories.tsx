import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Plate } from './Plate';

const meta: Meta<typeof Plate> = {
  title: 'Atoms/Plate',
  component: Plate,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Plate>;

export const Default: Story = {
  args: {
    variant: 'info',
    children: 'Check your email for a confirmation link.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Plate variant="success">Email verified successfully. You can now sign in.</Plate>
      <Plate variant="warning">Your session will expire in 5 minutes.</Plate>
      <Plate variant="error">Something went wrong. Please try again.</Plate>
      <Plate variant="info">We sent a confirmation link to your email.</Plate>
    </div>
  ),
};
