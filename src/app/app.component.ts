import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private DEFAULT_TEXT = '- enter name/age -';

  private name = signal('');
  private age = signal(0);

  private $name = toObservable(this.name);

  fullName = computed(() => {
    if (!this.name() || !this.age())
      return this.DEFAULT_TEXT;

    return `Nice ${this.name()}, you're ${this.age()}y old`;
  });

  constructor() {
    // Way to listen to fullName (computed)
    effect(() => (this.fullName() !== this.DEFAULT_TEXT) && console.log(`FullName: ${this.fullName()}`));
  }

  ngOnInit(): void {
    // Way to listem to name (signal)
    this.$name
      .pipe(filter(name => !!name))
      .subscribe((name) => console.log(`Name: ${name}`));
  }

  setName(event: any): void {
    this.name.set(event.target.value);
  }

  setAge(event: any): void {
    this.age.set(event.target.value);
  }
}
