import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const todoId = parseInt(id, 10);

  if (Number.isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  if (req.method === 'PATCH') {
    const { title, completed } = req.body;
    const data = {};
    if (typeof title === 'string') data.title = title;
    if (typeof completed === 'boolean') data.completed = completed;

    const updated = await prisma.todo.update({
      where: { id: todoId },
      data
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await prisma.todo.delete({ where: { id: todoId } });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PATCH', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
