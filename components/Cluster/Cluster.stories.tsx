import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Cluster } from './Cluster';
import { Button } from '../Button';
import { UpdatedAt } from '../UpdatedAt';

const meta: Meta<typeof Cluster> = {
  title: 'Layout/Cluster',
  component: Cluster,
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['start', 'center', 'end', 'baseline'] },
    justify: { control: 'select', options: ['start', 'end', 'between'] },
  },
};

export default meta;
type Story = StoryObj<typeof Cluster>;

export const Toolbar: Story = {
  args: {
    gap: 3,
    children: (
      <>
        <UpdatedAt updatedAt={Date.now() - 4000} />
        <Button variant="secondary" size="sm">Обновить</Button>
        <Button variant="secondary" size="sm">Отменить</Button>
      </>
    ),
  },
};
