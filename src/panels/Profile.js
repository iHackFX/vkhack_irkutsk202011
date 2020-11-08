import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import { Cell, Avatar, RichCell, Header, Link, Button } from "@vkontakte/vkui";
import { getUserConversations, getUsers } from "./../components/Requests";

const Profile = ({ id, fetchedUser, setModal, setPopout, userType }) => {
  const [conversations, setConversations] = useState(null);
  const [User, setUser] = useState(null);
  var types = {
    1: "Администрация",
    2: "Староста (Куратор)",
    3: "Студент (Ученик)",
  };
  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Div>
        <RichCell
          disabled
          before={<Avatar size={72} src={fetchedUser.photo_200} />}
          text={
            User && User[0].status !== "null"
              ? types[User[0].type] +
                ". " +
                (User[0].type !== "1" ? User[0].group + " Группа" : "")
              : getUsers(fetchedUser.id, setUser)
          }
          caption={fetchedUser.city.title}
        >
          {fetchedUser.first_name} {fetchedUser.last_name}
        </RichCell>
      </Div>
      <Group header={<Header mode="secondary">Мои беседы</Header>}>
        <Div>
          {conversations
            ? conversations.map((conversations, idx) => {
                return (
                  <Link key={idx} href={conversations.url} target="_blank">
                    <Cell
                      before={<Avatar />}
                      description={conversations.subject}
                    >
                      {conversations.name}
                    </Cell>
                  </Link>
                );
              })
            : getUserConversations(fetchedUser.id, setConversations)}
        </Div>
      </Group>
    </Panel>
  );
};

Profile.propTypes = {
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

export default Profile;
