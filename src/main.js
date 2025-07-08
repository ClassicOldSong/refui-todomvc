import './index.css'
import { signal, $, watch } from 'refui'
import { createDOMRenderer } from 'refui/dom'
import { defaults } from 'refui/browser'
import App from './App.jsx'

const { render } = createDOMRenderer(defaults)

const todos = signal(null)
const newTodo = signal('')
const filter = signal('all')
const editing = signal(null)

watch(() => {
	if (!todos.value) {
		todos.value = (JSON.parse(localStorage.getItem('todos')) || []).map(({ id, title, completed }) => ({
			id,
			title: signal(title),
			completed: signal(completed)
		}))
	} else {
		localStorage.setItem('todos', JSON.stringify(todos))
	}
})

const onHashChange = () => {
	const hash = window.location.hash.replace(/^#\//, '') || 'all'
	if (['all', 'active', 'completed'].includes(hash)) {
		filter.value = hash
	}
}
window.addEventListener('hashchange', onHashChange)
onHashChange()

const filteredTodos = $(() => {
	switch (filter.value) {
		case 'active':
			return todos.value.filter((t) => !t.completed.peek())
		case 'completed':
			return todos.value.filter((t) => t.completed.peek())
		default:
			return todos.value.slice()
	}
})

render(document.querySelector('.todoapp'), App, { todos, newTodo, filter, filteredTodos, editing })
