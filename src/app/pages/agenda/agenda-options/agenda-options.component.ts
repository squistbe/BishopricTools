import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController, AlertController } from '@ionic/angular';
import { AgendaService } from '../../../services/agenda.service';

@Component({
  selector: 'app-agenda-options',
  templateUrl: './agenda-options.component.html',
  styleUrls: ['./agenda-options.component.scss']
})
export class AgendaOptionsComponent implements OnInit {
  todo;

  constructor(
    public platform: Platform,
    private alert: AlertController,
    private popover: PopoverController,
    private agendaService: AgendaService
  ) { }

  ngOnInit() {
  }

  async colorTodo() {
    this.popover.dismiss();
    const todo = this.todo;
    const alert = await this.alert.create({
      header: 'Change color',
      inputs: [
        {
          type: 'radio',
          value: 'dark:general',
          label: 'General',
          checked: todo.color === 'dark'
        },
        {
          type: 'radio',
          value: 'done:bishopric',
          label: 'Bishopric',
          checked: todo.color === 'done'
        },
        {
          type: 'radio',
          value: 'primary:elders',
          label: 'Elders',
          checked: todo.color === 'primary'
        },
        {
          type: 'radio',
          value: 'secondary:ss',
          label: 'Sunday School',
          checked: todo.color === 'secondary'
        },
        {
          type: 'radio',
          value: 'danger:primary',
          label: 'Primary',
          checked: todo.color === 'danger'
        },
        {
          type: 'radio',
          value: 'tertiary:yw',
          label: 'Young Women',
          checked: todo.color === 'tertiary'
        },
        {
          type: 'radio',
          value: 'success:ym',
          label: 'Aaronic Priesthood',
          checked: todo.color === 'success'
        },
        {
          type: 'radio',
          value: 'warning:rs',
          label: 'Relief Society',
          checked: todo.color === 'warning'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            const parts = data.split(':');
            const color = parts[0];
            const type = parts[1];
            const item = {
              ...this.todo,
              color: color,
              type: type
            };
            this.agendaService.updateAgenda(item.id, item);
          }
        }
      ]
    });
    return await alert.present();
  }

  deleteTodo() {
    this.popover.dismiss();
    this.agendaService.deleteAgenda(this.todo.id);
  }

  toggleTodo() {
    this.popover.dismiss();
    this.agendaService.updateStatus(this.todo.id, this.todo.status === 'complete' ? 'pending' : 'complete');
  }
}
