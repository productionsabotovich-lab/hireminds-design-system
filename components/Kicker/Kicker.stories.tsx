import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Kicker } from './Kicker';

const meta: Meta<typeof Kicker> = {
  title: 'Atoms/Kicker',
  component: Kicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Kicker>;

export const Default: Story = {
  args: {
    children: 'SIGN IN',
  },
};

export const WithTick: Story = {
  args: {
    children: 'EMAIL VERIFIED',
    withTick: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Kicker>SIGN IN</Kicker>
      <Kicker>CREATE ACCOUNT</Kicker>
      <Kicker>RESET PASSWORD · STEP 1 / 3</Kicker>
      <Kicker withTick>EMAIL VERIFIED</Kicker>
    </div>
  ),
};
