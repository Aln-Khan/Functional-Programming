import tkinter as tk
from rx import subject

class TodoList:
    def __init__(self):
        self.tasks = []
        self.subject = subject.Subject()

    def add_task(self, task):
        self.tasks.append(task)
        self.subject.on_next(self.tasks)

    def remove_task(self, task_index):
        del self.tasks[task_index]
        self.subject.on_next(self.tasks)

    def get_tasks(self):
        return self.subject

class TodoApp:
    def __init__(self, todo_list, root):
        self.todo_list = todo_list
        self.root = root
        self.setup_ui()

    def setup_ui(self):
        self.task_entry = tk.Entry(self.root)
        self.task_entry.pack()

        self.add_button = tk.Button(self.root, text="Add Task", command=self.add_task)
        self.add_button.pack()

        self.tasks_label = tk.Label(self.root, text="Tasks:")
        self.tasks_label.pack()

        self.tasks_text = tk.Text(self.root, height=10, width=30)
        self.tasks_text.pack()

        self.task_click_subject = subject.Subject()

        self.tasks_text.bind("<Button-1>", self.on_task_click)

        self.todo_list.get_tasks().subscribe(self.update_ui)

    def update_ui(self, tasks):
        self.tasks_text.delete('1.0', tk.END)
        for i, task in enumerate(tasks):
            self.tasks_text.insert(tk.END, f"{i + 1}. {task}\n")

    def add_task(self):
        task = self.task_entry.get()
        if task:
            self.todo_list.add_task(task)
            self.task_entry.delete(0, tk.END)

    def on_task_click(self, event):
        index = self.tasks_text.index(tk.CURRENT)
        task_index = int(index.split('.')[0]) - 1
        self.task_click_subject.on_next(task_index)

if __name__ == "__main__":
    todo_list = TodoList()
    root = tk.Tk()
    todo_app = TodoApp(todo_list, root)

    todo_app.task_click_subject.subscribe(lambda task_index: todo_list.remove_task(task_index))

    root.mainloop()
