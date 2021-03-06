import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { takeWhile } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';
import { LoginService } from 'src/auth/login/login.service';

interface SuperPowers {
  name: string;
  ico?: string;
  goto?: string;
  children?: SuperPowers[];
}

const TREE_DATA: SuperPowers[] = [
  {
    name: 'To Dos',
    ico: 'list',
    goto: 'todos',
    children: [
      {name: 'Places'},
      {name: 'Experiences'},
      {name: 'Health'},
      {name: 'Hygiene'},
      {name: 'Errands'},
      {name: 'Shopping'}
    ]
  }, {
    name: 'Notes',
    ico: 'event_note',
    goto: 'notes',
    children: [
      { name: 'Dairy'}, 
      { name: 'Ideas'}
    ]
  }, {
    name: 'Time',
    ico: 'access_time',
    goto: 'time',
    children: [
      {name: `Assisted`},
      {name: 'Penned'},
      {name: 'Statistics'}
    ]
  }, {
    name: 'Spends',
    ico: 'attach_money',
    goto: 'spends',
    children: [
      {name: `Assisted`},
      {name: 'Penned'},
      {name: 'Statistics'}
    ]
  }, {
    name: 'Days',
    ico: 'today',
    goto: 'dates',
    children: [
      {name: `Assisted`},
      {name: 'Penned'},
      {name: 'Statistics'}
    ]
  }, {
    name: 'People',
    ico: 'people',
    goto: 'people',
    children: [
      {name: 'Family'},
      {name: 'Friends'},
      {name: 'Special'}
    ]
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  adminLoggedIn: boolean = false;
  mode = new FormControl('side');
  theme = new FormControl('primary');
  aliveSubscription: boolean = true;
  themeTest = new FormControl('');
  
  treeControl = new NestedTreeControl<SuperPowers>(node => node.children);
  dataSource = new MatTreeNestedDataSource<SuperPowers>();

  @ViewChild('sidenav') public sidenav;
  
  constructor(
    public authService: AuthService,
    public loginService: LoginService
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: SuperPowers) => !!node.children && node.children.length > 0;
  
  ngOnInit() {    
    this.adminLoggedIn  = this.authService.isLoggedIn();
    this.authService.loggedIn.pipe(takeWhile(() => this.aliveSubscription)).subscribe(() => this.adminLoggedIn = true);
    this.authService.loggedOut.pipe(takeWhile(() => this.aliveSubscription)).subscribe(() => this.adminLoggedIn = false);    
  }

  setSidebar(value) {
    this.mode.setValue(value);
    this.sidenav.open()
  }

  setTheme(value) {
    this.theme.setValue(value);
  }

  setThemeTest(value) {
    this.themeTest.setValue(value);
  }

  ngOnDestroy() {
    this.aliveSubscription = false;    
  }
}
