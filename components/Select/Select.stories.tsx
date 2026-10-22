import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md'] } },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: 'hireminds', label: 'hireminds' },
  { value: 'busina', label: 'busina' },
];

export const Default: Story = {
  args: { id: 'project', label: 'Проект', options, value: 'hireminds' },
};

export const Toolbar: Story = {
  args: { id: 'project-sm', label: 'Проект', options, value: 'hireminds', size: 'sm', inlineLabel: true },
};
