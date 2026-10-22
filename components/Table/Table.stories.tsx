import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Table } from './Table';
import { Pill } from '../Pill';

const meta: Meta<typeof Table> = {
  title: 'Data/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Runs: Story = {
  args: {
    caption: 'Запуски проекта',
    columns: [
      { key: 'task', label: 'Задача' },
      { key: 'phase', label: 'Фаза', width: '90px' },
      { key: 'state', label: 'Состояние' },
      { key: 'time', label: 'В фазе', align: 'right', mono: true, width: '90px' },
    ],
    rows: [
      { id: 'HIR-31', cells: { task: 'HIR-31 Экспорт отчёта', phase: 'Code', state: <Pill tone="accent" dot pulse>Выполняется</Pill>, time: '12 мин' } },
      { id: 'HIR-28', cells: { task: 'HIR-28 Роли проекта', phase: 'Review', state: <Pill tone="warn" dot>Ожидает решения</Pill>, time: '2 ч 05 мин' } },
    ],
    onRowClick: () => {},
  },
};
