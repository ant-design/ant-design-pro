import router from 'umi/router';

export function currentTeamSet(teamId) {
  return localStorage.setItem('yjq-user-team', teamId);
}

export function currentTeamGet() {
  const team = localStorage.getItem('yjq-user-team');

  if (!team) {
    router.push('/user/teams');
    return undefined;
  }
  return team;
}
