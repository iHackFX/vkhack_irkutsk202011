import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Icon24Cancel, Icon24Done, Icon28AddOutline } from "@vkontakte/icons";
import {
  ANDROID,
  IOS,
  Cell,
  Avatar,
  Link,
  Text,
  Button,
  PanelHeaderButton,
  Input,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  FormLayout,
  FormLayoutGroup,
} from "@vkontakte/vkui";
import { getPubConversations, createConversation } from "./../components/Requests";
import SubjectsSelect from "./../components/SubjectsSelect";
import "./Home.css";

const Conversations = ({ id, fetchedUser, setModal, setPopout }) => {
  const [conversations, setConversations] = useState(null);
  const [name, setName] = useState(false);
  const [url, setUrl] = useState(false);

  function addConversation() {
    setModal(
      <ModalRoot activeModal="addConversation" onClose={() => setModal(false)}>
        <ModalPage
          id="addConversation"
          onClose={() => setModal(false)}
          header={
            <ModalPageHeader
              left={
                ANDROID && (
                  <PanelHeaderButton onClick={() => setModal(false)}>
                    <Icon24Cancel />
                  </PanelHeaderButton>
                )
              }
            >
              Добавить беседу
            </ModalPageHeader>
          }
        >
          <Div>
            <FormLayout>
              <FormLayoutGroup>
                <Div>
                  <Input
                    id="name_input"
                    type="text"
                    placeholder="Название"
                  />
                </Div>
                <Div>
                  <Input
                    id="url_input"
                    type="text"
                    placeholder="Ссылка"
                  />
                </Div>
                <Div>
                  <SubjectsSelect id="subject_select"></SubjectsSelect>
                </Div>
                <Div>
                  <Button stretched onClick={() => {
                    createConversation(fetchedUser.id ,document.getElementById("name_input").value, document.getElementById("url_input").value, document.getElementById("subject_select").value);
                    setModal(null);
                  }} size="xl" mode="commerce">
                    Добавить
                  </Button>
                </Div>
              </FormLayoutGroup>
            </FormLayout>
          </Div>
        </ModalPage>
      </ModalRoot>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader
        left={<Icon28AddOutline onClick={() => addConversation()} />}
      >
        Беседы
      </PanelHeader>
      <Div>
        <SubjectsSelect
          id="subject"
          onChange={() =>
            getPubConversations(
              setConversations,
              document.getElementById("subject").value
            )
          }
        />
      </Div>
      <Div>
        {conversations ? (
          conversations.status !== "null response" ||
          conversations.length !== 0 ? (
            conversations.map((conversations, idx) => {
              return (
                <Link key={idx} href={conversations.url} target="_blank">
                  <Cell before={<Avatar />} description={conversations.subject}>
                    {conversations.name}
                  </Cell>
                </Link>
              );
            })
          ) : (
            <Text>
              Кажется в данной тематике нет бесед. Станьте первыми кто сделает
              чат в этой тематике!
            </Text>
          )
        ) : (
          getPubConversations(setConversations, "")
        )}
      </Div>
    </Panel>
  );
};

Conversations.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Conversations;
