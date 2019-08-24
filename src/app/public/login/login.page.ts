import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

const loginQuery = gql`
    mutation login($username: String!, $password: String!){
      login(data: {
        username: $username,
        password: $password
      }) {
        access_token
        user {
          id
          name
          email
        }
      } 
    }  
  `

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(
    private authservice: AuthenticationService,
    private apollo: Apollo 
  ) { }

  ngOnInit() {
  }

  emailLogin() {
    
    this.apollo.mutate({
      mutation: loginQuery,
      variables: {
        username: this.username,
        password: this.password
      }
    }).subscribe(({data}: ApolloQueryResult<any>) => {
      this.authservice.login(data.login.access_token);
      
    });
  }

}
