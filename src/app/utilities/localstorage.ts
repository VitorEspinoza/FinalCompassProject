export class LocalStorageUtils {

  public clearUserLocalData() {
      localStorage.removeItem('compassProject.token');
  }

  public getTokenUser(): string {
      return localStorage.getItem('compassProject.token') as string;
  }

  public saveTokenUser(token: string) {
      localStorage.setItem('compassProject.token', token);
  }


}
