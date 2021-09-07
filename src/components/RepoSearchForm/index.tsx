import React, { useState } from "react";
import { ButtonPrimary, FormGroup, TextInput } from "@primer/components";

import type { ChangeEvent, FC } from "react";
import type { GlobalFilters } from "../../types";

import "./index.scss";

interface RepoSearchFormProps {
  onSubmit: (inputs: Pick<GlobalFilters, "owner" | "repo">) => void;
}
const RepoSearchForm: FC<RepoSearchFormProps> = ({ onSubmit }) => {
  const [respositoryOwner, setRespositoryOwner] = useState("");
  const [respositoryName, setRespositoryName] = useState("");

  const handleRepoOwnerInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setRespositoryOwner(e.currentTarget.value);
  };

  const handleRepoNameInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setRespositoryName(e.currentTarget.value);
  };

  const handleSearchSubmit = (): void => {
    const dataValidation = validateFormData(respositoryOwner, respositoryName);
    if (dataValidation) {
      onSubmit({ owner: respositoryOwner, repo: respositoryName });
    }
  };

  const validateFormData = (owner: string, repo: string): boolean => {
    if (owner === "" || repo === "") {
      alert("Repository owner and name must be filled out");
      return false;
    }
    return true;
  };

  return (
    <span className="formContainer">
      <FormGroup ml={2} mr={2}>
        <FormGroup.Label htmlFor="Repository owner">
          Repository owner
        </FormGroup.Label>
        <TextInput
          autoFocus
          aria-label="Repository owner"
          css
          id="Repository owner"
          onChange={handleRepoOwnerInput}
          value={respositoryOwner}
        />
      </FormGroup>

      <FormGroup ml={2} mr={2}>
        <FormGroup.Label htmlFor="Repository name">
          Repository name
        </FormGroup.Label>
        <TextInput
          aria-label="Repository name"
          css
          id="Repository name"
          onChange={handleRepoNameInput}
          value={respositoryName}
        />
      </FormGroup>
      <ButtonPrimary className="submitButton" onClick={handleSearchSubmit}>
        Search
      </ButtonPrimary>
    </span>
  );
};

export default RepoSearchForm;
