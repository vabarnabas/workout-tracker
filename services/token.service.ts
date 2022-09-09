import Cookies from "universal-cookie"

class TokenService {
  public async saveToken(token: string): Promise<void> {
    const cookies = new Cookies()
    cookies.set("wt-token", token, { path: "/" })
  }

  public async deleteToken(): Promise<void> {
    const cookies = new Cookies()
    cookies.remove("wt-token", { path: "/" })
  }

  public getToken(): Promise<any> {
    const cookies = new Cookies()
    return cookies.get("wt-token")
  }
}

export default TokenService
