import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  categories: any[];
  loading: boolean =  true;
  errors: any;

  constructor(
    private authservice: AuthenticationService,
    private apollo: Apollo,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.apollo.watchQuery({
      query: gql`
        {
          categories{
            name
          }
        }
      `,
      context: {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+ this.storage.get('auth-token'))
      }
    }).valueChanges.subscribe((res:ApolloQueryResult<any>) => {
      this.categories = res.data.categories;
      this.loading = res.loading;
      this.errors = res.errors;
    })
  }

  logout() {
    this.authservice.logout();
  }

}
