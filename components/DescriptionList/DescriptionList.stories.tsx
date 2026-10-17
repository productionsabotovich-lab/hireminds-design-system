import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DescriptionList } from './DescriptionList';
import { Pill } from '../Pill';

const meta: Meta<typeof DescriptionList> = {
  title: 'Data/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  argTypes: { columns: { control: 'select', options: [1, 2, 3, 4] } },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const RunSummary: Story = {
  args: {
    items: [
      { label: 'Состояние', value: <Pill tone="danger" dot>Блокер</Pill> },
      { label: 'Фаза', value: 'Review' },
      { label: 'Роль', value: 'Reviewer' },
      { label: 'Круг', value: '2', mono: true },
    ],
  },
};
