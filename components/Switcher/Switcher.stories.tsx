'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Switcher } from './Switcher';

const meta: Meta<typeof Switcher> = {
  title: 'Atoms/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Switcher>;

const tabs = [
  { id: 'signin', label: 'Sign in' },
  { id: 'create', label: 'Create account' },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('signin');
    return <Switcher tabs={tabs} activeId={active} onSelect={setActive} />;
  },
};

export const AllVariants: Story = {
  render: () => {
    const [active1, setActive1] = useState('signin');
    const [active2, setActive2] = useState('monthly');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Switcher tabs={tabs} activeId={active1} onSelect={setActive1} />
        <Switcher
          tabs={[
            { id: 'monthly', label: 'Monthly' },
            { id: 'annual', label: 'Annual' },
          ]}
          activeId={active2}
          onSelect={setActive2}
        />
      </div>
    );
  },
};
