import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DescriptionList } from './DescriptionList';
import { Pill } from '../Pill';

const meta: Meta<typeof DescriptionList> = {
  title: 'Data/DescriptionList',
  component: DescriptionList,
  tags: ['autodocs'],
  argTypes: { layout: { control: 'select', options: ['stack', 'row'] }, columns: { control: 'select', options: [1, 2, 3, 4] } },
};

export default meta;
type Story = StoryObj<typeof DescriptionList>;

export const RunSummary: Story = {
  args: {
    items: [
      { label: 'Состояние', value: <Pill tone="danger" dot>Ошибка</Pill> },
      { label: 'Фаза', value: 'Review' },
      { label: 'Роль', value: 'Reviewer' },
      { label: 'Возвраты', value: '2', mono: true },
    ],
  },
};

export const AboutTask: Story = {
  args: {
    layout: 'row',
    items: [
      { label: 'Приоритет', icon: 'priority', value: <Pill tone="warn">Высокий</Pill> },
      { label: 'Тип', icon: 'type', value: 'feature' },
      { label: 'Репозиторий', icon: 'repo', value: 'hireminds-pilot-app', mono: true },
      { label: 'Ветка', icon: 'branch', value: 'feature/pil-15-roles-and-access-matrix', mono: true, title: 'feature/pil-15-roles-and-access-matrix' },
      { label: 'Раннер', icon: 'runner', value: 'Claude Code · Sonnet 5.5' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 360, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 8 }}><Story /></div>],
};
