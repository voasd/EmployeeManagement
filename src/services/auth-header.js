export default function authHeader () {
  const user = JSON.parse(localStorage.getItem('UserInfo'))
  if (user && user.token) {
    return {
      // Authorization: 'Bearer ' + user.token,
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YjY5ODBkZi1iYWQ2LTQ2MGEtYWFlYS02NDU5MWIzYWU3YWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVm8gVGhhbmggTmhhbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoibmhhbnZ0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5zdHJhdG9yIiwiZXhwIjoxNjEwOTM2MzgyLCJpc3MiOiJFRE0iLCJhdWQiOiJFRE0ifQ.nuivNOON_VLxNz0G5HAWLwXJhePGYi3q7igVsuE6IIc',
      'Access-Control-Allow-Origin': '*'
    }
  } else {
    return {}
  }
  // return {
  //   Authorization:
  //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5YjY5ODBkZi1iYWQ2LTQ2MGEtYWFlYS02NDU5MWIzYWU3YWUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVm8gVGhhbmggTmhhbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoibmhhbnZ0IiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW5zdHJhdG9yIiwiZXhwIjoxNjExMTE1MzU0LCJpc3MiOiJFRE0iLCJhdWQiOiJFRE0ifQ.C6NSEiHZ3ytjLp-64ojgY5Ud-8QIrLkvRuTMLPLG8k4',
  //   'Access-Control-Allow-Origin': '*'
  // }
}
