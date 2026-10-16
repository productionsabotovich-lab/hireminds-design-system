'use client';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

const meta: Meta<typeof PasswordStrengthMeter> = {
  title: 'Atoms/PasswordStrengthMeter',
  component: PasswordStrengthMeter,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PasswordStrengthMeter>;

export const Default: Story = {
  render: () => {
    const [pw, setPw] = useState('hello');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <input
          type="text"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Type a password..."
          style={{ padding: '6px 10px', border: '1px solid var(--line-2)', borderRadius: 6, fontSize: 13 }}
        />
        <PasswordStrengthMeter password={pw} />
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--mute)' }}>Weak (score 1)</p>
        <PasswordStrengthMeter password="hello" />
      </div>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--mute)' }}>Medium (score 2)</p>
        <PasswordStrengthMeter password="hello123" />
      </div>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--mute)' }}>Good (score 3)</p>
        <PasswordStrengthMeter password="Hello123" />
      </div>
      <div>
        <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--mute)' }}>Excellent (score 4)</p>
        <PasswordStrengthMeter password="Hello123!" />
      </div>
    </div>
  ),
};
