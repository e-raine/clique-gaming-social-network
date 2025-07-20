import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-1_jdYAINE01",
    ClientId: "32bvp3mjkd865529i0kpd4e94m"
}

export default new CognitoUserPool(poolData);