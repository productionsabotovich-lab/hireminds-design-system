import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ConfirmDialog } from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Overlays/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'select', options: ['default', 'danger'] } },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const CancelRun: Story = {
  args: {
    open: true,
    title: 'Отменить запуск?',
    children: 'Статус issue в трекере не изменится.',
    confirmLabel: 'Отменить',
    cancelLabel: 'Назад',
    tone: 'danger',
    onConfirm: () => {},
    onCancel: () => {},
  },
};
