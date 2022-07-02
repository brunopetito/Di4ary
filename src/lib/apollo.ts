import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {


  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4vkzw981oj301t658u6cr2b/master" ,
  headers:{
    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTYyNzE3NDgsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsNHZrenc5ODFvajMwMXQ2NTh1NmNyMmIvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYTE2ZDI1NTEtODYxMC00OWYyLTg0ZTQtNzRkNGI0ODliMDM3IiwianRpIjoiY2w0dnBmb21kMXEwYzAxdWs0aDByMjJhNiJ9.pxXAvW0VPkmrj9qH1LHKDeleS2r47Pkv8niozt3tqT0eQ7GWVQhVpOwwKRajYWccR2Rg_GJouMUBaCKYzN4qtSfYLr5lpe2c-4zlQApUytuRu3lxp6dfJvJ6y3EenOsLXBrpkArjHWt25ywLDM2mRFFr-4WcLkqZ-lokfV4UiqJ9JlpTpuyEjzglQUFOe8V7A4gOHbEgq3Q_u1fHBbyY8EPE42g8zF1N0C2SqllMvUC5vSz9IUJSbHYzsiQDmR3GMbAevbywiNJJ0MMB0QStJg9ILh6SDuiG6amwJyoEP6dcF8nt-7-18nt5EJ7LVdzPdZk4UQqWORPLx4W7dfYRG4LIC8rG2gj2BK1g9jdIr6wSyHYZ77iJ5XarTs228oo8gfp0ity9UJb7fGU4bBBcBc8ErCM80hpNrQORsf3It0MJ20xFuOFvW6FIbEk-vG9eaG02eOUGrRaQ1ejf9a6OJx-PvvdcmIvEgmDXULe_5EDk32uwBGRu2cfv0hZ6-unbcb7-dWZcCAR3tAdqKEjkFAy7jkf3XYvIdw24680s6xDmBx1vTp3yVPNtWH8S8oS_OTicSV01ymxoex13sqXdg5rNMMyy7e7dC8YxXFGZWy1FRRn4AeCXgLBcVPnqA8sFbdnjiRnz9CAF_7d17ht8nOc3Ovdd6RDwToh94DS0dM8  `
  },
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});