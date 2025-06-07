import { NextRequest, NextResponse } from 'next/server'

// TypeScript interface for a to-do item
export type Todo = {
  id: number
  title: string
  completed: boolean
}

// In-memory list (will reset when server restarts)
let todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Write Homework', completed: true },
  { id: 3, title: 'Go for a Walk', completed: false }
]

// GET /api/todos
export async function GET() {
  return NextResponse.json(todos)
}

// POST /api/todos
export async function POST(request: NextRequest) {
  const body = await request.json()

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }

  const newTodo: Todo = {
    id: Date.now(),
    title: body.title,
    completed: false
  }

  todos.push(newTodo)

  return NextResponse.json(newTodo, { status: 201 })
}

// PATCH /api/todos?id=123
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '')

  if (!id) {
    return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 })
  }

  const index = todos.findIndex(todo => todo.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  todos[index].completed = !todos[index].completed
  return NextResponse.json(todos[index])
}

// DELETE /api/todos?id=123
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '')

  if (!id) {
    return NextResponse.json({ error: 'Missing or invalid ID' }, { status: 400 })
  }

  const index = todos.findIndex(todo => todo.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
  }

  const deleted = todos.splice(index, 1)[0]
  return NextResponse.json(deleted)
}
