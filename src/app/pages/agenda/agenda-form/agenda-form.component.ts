import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgendaService } from '../../../services/agenda.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.scss']
})
export class AgendaFormComponent implements OnInit {
  todoForm: FormGroup;
  users: Observable<any>;
  todo;

  constructor(
    private userService: UserService,
    private modal: ModalController,
    private fb: FormBuilder,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
    const data = {
      content: '',
      status: 'pending',
      ...this.todo
    };
    this.todoForm = this.fb.group({
      content: [
        data.content,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250)
        ]
      ],
      status: [data.status, [Validators.required]],
      uid: [data.uid],
      color: [data.color || 'dark']
    });
  }

  async createTodo() {
    const id = this.todo.id || '';
    const data = {
      unitNumber: 477400,
      createdAt: Date.now(),
      ...this.todo,
      ...this.todoForm.value
    };

    this.close();
    this.agendaService.updateAgenda(id, data);
  }

  async close() {
    this.modal.dismiss();
  }

}
