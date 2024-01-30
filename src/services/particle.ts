import axios from "axios";
import config from "../config/config";
import { particle_int } from "./types/particle";

class Particle implements particle_int{
    private serverKey = config.particle.server_key
    private projectKey = config.particle.project_id
    private baseUrl = config.particle.base_url

authenticate = async (user_id: string, user_token: string) => {
  const response = await axios.post(
    this.baseUrl,
    {
      jsonrpc: "2.0",
      id: 0,
      method: "getUserInfo",
      params: [user_id, user_token],
    },
    {
      auth: {
        username: this.projectKey!,
        password: this.serverKey!,
      },
    }
  );
  return response.data
}

}

const particle = new Particle()

export default Object.freeze(particle)