import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Brand } from './Brand';

const meta: Meta<typeof Brand> = {
  title: 'Atoms/Brand',
  component: Brand,
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
type Story = StoryObj<typeof Brand>;

export const Default: Story = {
  args: {
    name: 'Hireminds',
  },
};

export const WithCustomMark: Story = {
  args: {
    name: 'Hireminds',
    mark: 'H',
  },
};

export const Clickable: Story = {
  args: {
    name: 'Hireminds',
    onClick: () => alert('Brand clicked'),
  },
};

export const AlternativeName: Story = {
  args: {
    name: 'Acme Corp',
  },
};
