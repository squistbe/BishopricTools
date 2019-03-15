import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AgendaService } from '../../services/agenda.service';
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { ModalController, PopoverController, Platform } from '@ionic/angular';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AgendaOptionsComponent } from './agenda-options/agenda-options.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit, OnDestroy {
  todos;
  users: Observable<any>;
  you;
  userId;
  statusFiltered;
  statusfilter = new BehaviorSubject(null);
  userSub = new BehaviorSubject('');

  constructor(
    private agendaService: AgendaService,
    private userService: UserService,
    private modal: ModalController,
    private popover: PopoverController,
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthService,
    public platform: Platform
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userSub.next(this.userId);
    this.users = this.userService.getUsers();
    this.todos = this.userSub.pipe(
      switchMap(uid => {
        this.location.go(`/agenda/${uid || ''}`);
        return this.agendaService.getAgenda(uid);
      }),
      shareReplay(1)
    );
    this.statusFiltered = this.statusfilter.pipe(
      switchMap(status => {
        return this.todos.pipe(
          map(arr =>
            (arr as any[]).filter(
              obj => (status ? obj.status === status : true)
            )
          )
        );
      })
    );
    if (!this.userId) {
      this.you = this.auth.user$.subscribe(it => this.userSub.next(it.uid));
    }
  }

  ngOnDestroy() {
    if (this.you) {
      this.you.unsubscribe();
    }
  }

  updateFilter(val) {
    this.statusfilter.next(val);
  }

  getFilter() {
    return this.statusfilter.getValue();
  }

  updateUser(val) {
    this.userSub.next(val);
  }

  trackById(idx, todo) {
    return todo.id;
  }

  deleteTodo(todo) {
    this.agendaService.deleteAgenda(todo.id);
  }

  toggleStatus(todo) {
    const status = todo.status === 'complete' ? 'pending' : 'complete';
    this.agendaService.updateStatus(todo.id, status);
  }

  async presentTodoForm(sortIndex) {
    const uid = this.userSub.getValue();
    const todo = {uid, sortIndex};
    const modal = await this.modal.create({
      component: AgendaFormComponent,
      componentProps: {todo}
    });

    return await modal.present();
  }

  async presentTodoOptions(e, todo) {
    const popover = await this.popover.create({
      event: e,
      cssClass: 'agenda-options',
      component: AgendaOptionsComponent,
      componentProps: {todo}
    });
    return await popover.present();
  }

  reorderTodos(event, todos) {
    const stop = event.detail.from > event.detail.to ? event.detail.from : event.detail.to;
    const start = event.detail.from < event.detail.to ? event.detail.from : event.detail.to;
    const itemToMove = todos.splice(event.detail.from, 1)[0];
    todos.splice(event.detail.to, 0, itemToMove);
    event.currentTarget.complete();
    for (let i = start; i <= stop; i++) {
      todos[i].sortIndex = i;
      this.agendaService.updateAgenda(todos[i].id, todos[i]);
    }
  }

  focusTodo(todo, e) {
    if (e.target.tagName === 'ION-ITEM') {
      todo.$$focused = true;
      const textarea = e.target.querySelector('ion-textarea');
      const input = textarea.getInputElement();
      input.then(el => {
        setTimeout(() => {
          textarea.setFocus();
          el.style.height = el.scrollHeight + 'px';
          el.style.paddingLeft = 0;
          el.style.paddingTop = '11px';
          el.style.paddingBottom = '10px';
        }, 100);
      });

    }
  }

  blurTodo(todo, e?, sortIndex?) {
    e.target.getInputElement().then(el => {
      el.style.height = 'auto';
    });
    todo.$$focused = false;
    if (!e.target.value) {
      return;
    }
    const data = {
      ...todo,
      sortIndex: sortIndex || todo.sortIndex,
      unitNumber: todo.unitNumber || 477400,
      status: todo.status || 'pending',
      content: todo.content || e.target.value,
      uid: todo.uid || this.userId,
      createdAt: todo.createdAt || Date.now()
    };
    this.agendaService.updateAgenda(data.id, data);
    if (!todo.id) {
      e.target.value = '';
    }
  }

}
