import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SingleCard } from "../layouts";
import { Blank } from "../layouts";
import { CreateAccountForm } from "../components";
import { AuthButton } from "../components";
import { useAuth } from "../contexts/auth";
import { CardAuth } from "../components";

export const UnauthenticatedContent = () => {
  const auth = useAuth();

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <Blank title="Auth">
            <CardAuth title="Zaloguj się" description="">
              <div style={{ textAlign: "center" }}>
                <AuthButton action="sign-in" />
              </div>
            </CardAuth>
          </Blank>
        }
      />

      <Route
        path="/create-account"
        element={
          <SingleCard title="Sign Up">
            <CreateAccountForm buttonLink="/login" redirectLink="/login" />
          </SingleCard>
        }
      />

      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};
