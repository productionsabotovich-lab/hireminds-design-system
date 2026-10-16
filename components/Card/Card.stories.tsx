import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Card body content goes here.',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'API Key',
    children: 'Your integration key is shown below.',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Danger Zone',
    children: 'Deleting your workspace is irreversible. All data will be lost.',
    footer: (
      <>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </>
    ),
  },
};

export const CustomHeader: Story = {
  args: {
    header: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--ink)' }}>Settings</span>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    ),
    children: 'Custom header slot with actions.',
  },
};
