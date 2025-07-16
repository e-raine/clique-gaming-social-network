import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-southeast-1_jdYAINE01",
    ClientId: "q5ich4ivl2jo804j7du6k9qqo"
}

export default new CognitoUserPool(poolData);