import React, { useState } from "react";
import PropTypes from "prop-types";
import bridge from "@vkontakte/vk-bridge";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import {
  Icon28AddOutline,
  Icon28EditOutline,
} from "@vkontakte/icons";
import {
  Cell,
  Avatar,
  RichCell,
  Header,
  Button,
  Input,
  FormLayout,
  FormLayoutGroup,
  Select,
} from "@vkontakte/vkui";

import { getUsers, addOrEditUser, removeUser } from "./../components/Requests";

const ModerPanel = ({ id, fetchedUser, setModal, setPopout, userType }) => {
  const [User, setUser] = useState(null);
  const [VkUser, setVkUser] = useState(null);
  const [localUser, setLocalUser] = useState(false);

  function getUser() {
    bridge
      .send("VKWebAppGetFriends")
      .then((data) => {
        getUsers(data.users[0].id, setUser);
        setVkUser(data.users[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  var types = {
    1: "Администрация",
    2: "Староста (Куратор)",
    3: "Студент (Ученик)",
  };

  return (
    <Panel id={id}>
      <PanelHeader>Панель старосты</PanelHeader>
      <Div>
        <RichCell
          disabled
          before={<Avatar size={72} src={fetchedUser.photo_200} />}
          text={
            localUser && localUser[0].status !== "null"
              ? types[localUser[0].type] +
                ". " +
                (localUser[0].type !== "1" ? localUser[0].group + " Группа" : "")
              : getUsers(fetchedUser.id, setLocalUser)
          }
          caption={fetchedUser.city.title}
        >
          {fetchedUser.first_name} {fetchedUser.last_name}
        </RichCell>
      </Div>
      <Group
        header={<Header mode="secondary">Люди у которых есть доступ</Header>}
      >
        {User ? (
          <Div>
            <FormLayout>
              <FormLayoutGroup>
                <Div>
                  <Cell
                    before={<Avatar src={VkUser.photo_200} />}
                    description={
                      User && User[0].status !== "null"
                        ? types[User[0].type] + ". " + (User[0].type !== "1" ? User[0].group +  " Группа" : "")
                        : "Не зарегистрирован (-а)"
                    }
                  >
                    {VkUser.first_name + " " + VkUser.last_name}
                  </Cell>
                </Div>
                <Div>
                  <Select
                    id="select_type"
                    stretched
                    bottom="Тип пользователя"
                    defaultValue={User && User[0].status !== "null" ? User[0].type : null}
                  >
                    <option value="3">Студент (Ученик)</option>
                    <option value="2">Староста (Куратор)</option>
                  </Select>
                </Div>
                <Div style={{display: "none"}}>
                  <Input
                    id="input_type"
                    type="text"
                    placeholder="Группа"
                    value={User && User[0].status !== "null" ? User[0].group : null}
                  />
                </Div>
                <Div style={{ display: "flex" }}>
                  <Button
                    stretched
                    size="xl"
                    onClick={() => {
                      addOrEditUser(
                        VkUser.id,
                        document.getElementById("select_type").value,
                        document.getElementById("input_type").value
                      );
                      setUser(null);
                      setVkUser(null);
                    }}
                    mode="commerce"
                  >
                    Готово
                  </Button>
                  <Button
                    stretched
                    size="xl"
                    mode="destructive"
                    onClick={() => {
                      removeUser(VkUser.id);
                      setUser(null);
                      setVkUser(null);
                    }}
                  >
                    Удалить
                  </Button>
                </Div>
              </FormLayoutGroup>
            </FormLayout>
          </Div>
        ) : (
          <Div>
            <Button
              size="xl"
              stretched
              onAbort={() => {
                setUser(null);
              }}
              onClick={() => {
                getUser();
              }}
              before={<Icon28AddOutline />}
              after={<Icon28EditOutline />}
            >
              Добавить или изменить
            </Button>
          </Div>
        )}
      </Group>
    </Panel>
  );
};

ModerPanel.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    id: PropTypes.string,
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default ModerPanel;
