import { AutoComplete, Button, Form, Input, List, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cloneDeep } from 'lodash';
import socket from 'plugins/socket';
import React, { useEffect, useMemo, useState } from 'react';
import { selectorUserInfo } from 'redux/auth/selectors';
import { createConversation, getConversationByUserId } from 'redux/chat/actions';
import { selectorConversationList } from 'redux/chat/selector';
import { IConversation } from 'redux/chat/type';
import { actionGetFriend } from 'redux/network/actions';
import { selectorFriends } from 'redux/network/selectors';
import { getMessageError } from 'utils/common';
import { notificationError, notificationSuccess } from 'utils/notifications';
import ConversationItem from './ConversationItem';

export default function ConversationList() {
  const dispatch = useAppDispatch();
  const friends = useAppSelector(selectorFriends);
  const userInfo = useAppSelector(selectorUserInfo);

  useEffect(() => {
    dispatch(actionGetFriend()).unwrap();
  }, [dispatch]);

  const options = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];

  const friendOptions = useMemo(() => {
    return (
      friends?.map((item) => {
        return { value: item?.email };
      }) || []
    );
  }, [friends]);

  const conversationList = useAppSelector(selectorConversationList);
  const [openCreateConversationPopup, setOpenCreateConversationPopup] = useState(false);
  const [openModalDiscardChange, setOpenModalDiscardChange] = useState(false);

  const handleCancel = () => {
    setOpenModalDiscardChange(true);
  };

  const handleOkDiscard = () => {
    setOpenModalDiscardChange(false);
    setOpenCreateConversationPopup(false);
    setOpenCreateConversationPopup(false);
    setMemberList([]);
    form.resetFields();
  };

  const handleCancelDiscard = () => {
    setOpenModalDiscardChange(false);
  };

  const [membersList, setMemberList] = useState<string[]>([]);
  const [memberValue, setMemberValue] = useState<string>('');
  const [form] = Form.useForm();

  const handleClickStartNewConversation = () => {
    setOpenCreateConversationPopup(true);
  };

  const handleSearchConversation = () => {
    console.log('first');
  };

  const handleCreateNewConversation = async () => {
    const payload: ICreateConversation = {
      is_inbox: membersList.length === 1,
      is_conversation_request: false,
      title: form.getFieldValue('name'),
      last_message_id: null,
      description: form.getFieldValue('description'),
      background: null,
      members: membersList,
    };

    try {
      const newConversation = await dispatch(createConversation(payload)).unwrap();
      socket.createConversation(newConversation as any as IConversation);
      notificationSuccess('Create Conversation Successful!');
      setOpenCreateConversationPopup(false);
      dispatch(getConversationByUserId(userInfo?.account_id || 0));
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleAddMember = (value: string) => {
    if (!value) return;
    const newMemberList = cloneDeep(membersList);
    newMemberList.push(value);
    setMemberList(newMemberList);
    setMemberValue('');
  };

  const handleRemoveMember = (member: string) => {
    console.log(member);
    const newMemberList = cloneDeep(membersList);

    setMemberList(
      newMemberList.filter((item) => {
        return item != member;
      })
    );
  };

  return (
    <div className="h-full rounded-md flex flex-col gap-4">
      <div className="bg-white h-[calc(100%-80px)] overflow-y-scroll">
        <div className="px-5 flex items-center gap-4 border-b-2 border-0 !border-gray-400 border-solid sticky top-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-white">
          <h2 className="uppercase leading-[48px] font-semibold text-[13px]">Chats</h2>
          <Search placeholder="search conversation" onSearch={handleSearchConversation} className="flex-1" />
        </div>
        <ul>
          {conversationList.map((item, index) => {
            return (
              <li className="h-16 !border-b border-0 !border-gray-400 border-solid flex items-center px-5" key={index}>
                <ConversationItem {...item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className=" bg-white px-5 h-16 flex items-center">
        <Button block type="primary" className="w-full" onClick={handleClickStartNewConversation}>
          Start New Chat
        </Button>
      </div>

      <Modal
        title="Create new conversation"
        open={openCreateConversationPopup}
        okText="Create"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={handleCreateNewConversation}
        destroyOnClose={true}
      >
        <Form
          className="my-8"
          name="createConversationForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={handleClickStartNewConversation}
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your conversation name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your conversation description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Members" name="members">
            <div>
              <AutoComplete
                dropdownMatchSelectWidth={252}
                options={options}
                value={memberValue}
                onSelect={(value) => {
                  setMemberValue(value);
                }}
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              >
                <Input.Search
                  value={memberValue}
                  size="large"
                  onChange={(event) => {
                    setMemberValue(event.target.value);
                  }}
                  enterButton="Add"
                  onSearch={handleAddMember}
                />
              </AutoComplete>
              {!!membersList.length && (
                <List
                  size="small"
                  header={null}
                  footer={null}
                  dataSource={membersList}
                  renderItem={(item) => (
                    <List.Item key={item}>
                      <p>{item}</p>
                      <Button
                        type="link"
                        onClick={() => {
                          handleRemoveMember(item);
                        }}
                      >
                        Remove
                      </Button>
                    </List.Item>
                  )}
                />
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Discard changes"
        open={openModalDiscardChange}
        onOk={handleOkDiscard}
        onCancel={handleCancelDiscard}
        okText="Discard"
        cancelText="No thanks"
      >
        <p>Are you sure you want to discard the changes you made?</p>
      </Modal>
    </div>
  );
}
