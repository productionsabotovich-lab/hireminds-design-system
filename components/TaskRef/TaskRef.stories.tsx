import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TaskRef } from './TaskRef';
import { H1 } from '../H1';

const meta: Meta<typeof TaskRef> = {
  title: 'Data/TaskRef',
  component: TaskRef,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['cell', 'heading'] } },
};

export default meta;
type Story = StoryObj<typeof TaskRef>;

export const Cell: Story = {
  args: { issueKey: 'HIR-28', title: 'Роли проекта' },
};

export const Heading: Story = {
  render: () => (
    <H1 size="section"><TaskRef variant="heading" issueKey="HIR-28" title="Роли проекта" /></H1>
  ),
};
