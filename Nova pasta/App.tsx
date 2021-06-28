import "react-native-gesture-handler";
import React, { useState } from "react";

import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { View, Image, Text } from "react-native";
import { Formik } from "formik";
import { TextField, Button, Card } from "@material-ui/core";
import { createStackNavigator } from "@react-navigation/stack";
import LoginService from "./services/LoginService";
import VacinaService from "./services/VacinaService";

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 10,
          backgroundColor: "lightgray",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5rAcrirwx1So9ZXz97855orTrT_Ah-78NSA&usqp=CAU"
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
              marginBottom: 20
            }}
          />
        </View>

        <Formik
          initialValues={{ email: "", senha: "" }}
          onSubmit={async (values) => {
            let logou = await LoginService.Login(values.email, values.senha);
            if (logou) navigation.navigate("Inicio");
            else alert("Ops, Erro ao fazer login");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextField
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                label="Email"
                style={{ margin: 10 }}
                value={values.email}
                color="primary"
              />
              <TextField
                onChange={handleChange("senha")}
                onBlur={handleBlur("senha")}
                label="Senha"
                value={values.senha}
                style={{ margin: 10 }}
                color="primary"
              />

              <Button
                style={{ margin: 10 }}
                onClick={handleSubmit}
                variant='contained'
                color='primary'
              >
                Login
              </Button>
              <Button
                style={{ margin: 10 }}
                onClick={() => navigation.navigate("Cadastrar")}
                variant="contained"
                color="primary"
              >
                Cadastrar
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

function CadastroScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          margin: 10,
          backgroundColor: "whitesmoke",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={
              "https://saude.abril.com.br/wp-content/uploads/2020/12/programa-de-vacina.png?w=680"
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              alignSelf: "center",
            }}
          />
        </View>

        <Formik
          initialValues={{ email: "", senha: "", confirmarSenha: "", nome: "" }}
          onSubmit={async (values) => {
            let cadastrou = await LoginService.Cadastrar(
              values.email,
              values.senha,
              values.confirmarSenha,
              values.nome
            );
            if (cadastrou) {
              alert("Sucesso!, Usuario cadastrado com sucesso!");
              navigation.goBack();
            } else {
              alert(
                "Ops, Não foi possivel realizar o cadastro verifique as informações"
              );
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <TextField
                onChange={handleChange("nome")}
                onBlur={handleBlur("nome")}
                label="Nome"
                style={{ margin: 10 }}
                value={values.nome}
              />
              <TextField
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                label="Email"
                style={{ margin: 10 }}
                value={values.email}
              />
              <TextField
                onChange={handleChange("confirmarSenha")}
                onBlur={handleBlur("confirmarSenha")}
                label="Confirmar Senha"
                value={values.confirmarSenha}
                style={{ margin: 10 }}
              />
              <TextField
                onChange={handleChange("senha")}
                onBlur={handleBlur("senha")}
                label="Senha"
                value={values.senha}
                style={{ margin: 10 }}
              />

              <Button
                style={{ margin: 10 }}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
              >
                Cadastrar
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

function MainScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ justifyContent: "center", flex: 1 }}>
      <View style={{ margin: 10, flex: 1, flexDirection: "column" }}>
        <Card style={{ margin: 10 }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 50, margin: 10 }}>1°</Text>
            </View>

            <Button
              style={{ margin: 10 }}
              onClick={() => {
                let pediu = VacinaService.PedirPrimeiraDose("Teste");
                if (pediu) alert("Primeira dose solicitada!");
                else alert("Não possivel pedir a primeira dose!");
              }}
              variant="contained"
              color="primary"
            >
              Solicitar primeira dose
            </Button>
          </View>
        </Card>

        <Card style={{ margin: 10 }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 50, margin: 10 }}>2°</Text>
            </View>

            <Button
              style={{ margin: 10 }}
              onClick={() => {
                let pediu = VacinaService.PedirSegundaDose("Teste");
                if (pediu) alert("Segunda dose solicitada!");
                else alert("Não possivel pedir a segunda dose!");
              }}
              variant="contained"
              color="primary"
            >
              Solicitar segunda dose
            </Button>
          </View>
        </Card>
      </View>

      <Button
        style={{ margin: 10 }}
        onClick={() => {
          navigation.navigate("Login")
        }}
        variant="contained"
        color="primary"
      >
        Sair
      </Button>
    </View>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Cadastrar" component={CadastroScreen} />
        <Stack.Screen name="Inicio" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
