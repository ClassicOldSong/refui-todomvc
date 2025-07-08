import { signal, $, For, If, onCondition, nextTick, merge } from 'refui'

const App = ({ todos, newTodo, filter, filteredTodos, editing }) => {
	const isEditing = onCondition(editing)

	const addTodo = (e) => {
		if (e.key === 'Enter') {
			const title = newTodo.value.trim()
			if (title) {
				todos.value.push({ id: Date.now(), title: signal(title), completed: signal(false) })
				newTodo.value = ''
				todos.trigger()
				filteredTodos.trigger()
			}
		}
	}

	const removeTodo = (id) => {
		todos.value = todos.value.filter((t) => t.id !== id)
	}

	const startEditing = (id) => {
		editing.value = id
	}

	const doneEdit = (title, e) => {
		if (e.key === 'Enter' || e.type === 'blur') {
			const newTitle = e.target.value.trim()
			if (newTitle) {
				title.value = newTitle
				todos.trigger()
			} else {
				removeTodo(editing.value)
			}
			editing.value = null
		} else if (e.key === 'Escape') {
			title.trigger()
			editing.value = null
		}
	}

	const remaining = $(() => todos.value.filter((t) => !t.completed.peek()).length)
	const allDone = merge([remaining, todos], (_remaining, _todos) => {
		return _remaining === 0 && _todos.length > 0
	})

	const toggleAll = () => {
		const done = !allDone.value
		for (const todo of todos.value) {
			todo.completed.value = done
		}

		todos.trigger()
	}

	const clearCompleted = () => {
		todos.value = todos.value.filter((t) => !t.completed.peek())
	}

	return (R) => (
			<>
				<header class="header">
					<h1>todos</h1>
					<input
						class="new-todo"
						placeholder="What needs to be done?"
						autofocus
						value={newTodo}
						on:input={(e) => (newTodo.value = e.target.value)}
						on:keydown={addTodo}
					/>
				</header>
				<If condition={$(() => todos.value.length > 0)}>
					{() => (
						<>
							<section class="main">
								<div class="toggle-all-container">
									<input id="toggle-all" class="toggle-all" type="checkbox" checked={allDone} on:change={toggleAll} />
									<label for="toggle-all">Mark all as complete</label>
								</div>
								<ul class="todo-list">
									<For entries={filteredTodos}>
										{({ item: { id, title, completed } }) => {
											const isItemEditing = isEditing(id)
											const editDone = doneEdit.bind(null, title)
											return (
												<li class:completed={completed} class:editing={isItemEditing}>
													<div class="view">
														<input
															class="toggle"
															type="checkbox"
															checked={completed}
															on:change={() => {
																completed.value = !completed.value
																todos.trigger()
															}}
														/>
														<label on:dblclick={() => startEditing(id)}>{title}</label>
														<button class="destroy" on:click={() => removeTodo(id)}></button>
													</div>
													<If condition={isItemEditing}>
														{() => (
															<input
																class="edit"
																value={title}
																on:keydown={editDone}
																on:blur={editDone}
																autofocus
																$ref={(el) => {
																	if (el) {
																		setTimeout(() => {
																			el.focus()
																			el.setSelectionRange(0, el.value.length)
																		}, 0)
																	}
																}}
															/>
														)}
													</If>
												</li>
											)
										}}
									</For>
								</ul>
							</section>
							<footer class="footer">
								<span class="todo-count">
									<strong>{remaining}</strong> {$(() => (remaining.value === 1 ? 'item' : 'items'))} left
								</span>
								<ul class="filters">
									<li>
										<a href="#/" class:selected={filter.eq('all')}>
											All
										</a>
									</li>
									<li>
										<a href="#/active" class:selected={filter.eq('active')}>
											Active
										</a>
									</li>
									<li>
										<a href="#/completed" class:selected={filter.eq('completed')}>
											Completed
										</a>
									</li>
								</ul>
								<If condition={$(() => todos.value.length > remaining.value)}>
									{() => (
										<button class="clear-completed" on:click={clearCompleted}>
											Clear completed
										</button>
									)}
								</If>
							</footer>
						</>
					)}
				</If>
			</>
	)
}

export default App
