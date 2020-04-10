const { setup, teardown } = require('./helpers');

const basicUser = {
  uid: 'user1',
  email: 'testmail@firebase.com'
}

const mockBoardData = {
  'todo-boards/board1': {
    owner: 'user1',
    private: true,
    name: 'Test Board 1',
    color: 'yellow'
  },
  'todo-boards/board2': {
    owner: 'user2',
    private: false,
    name: 'Test Board 2',
    color: 'yellow'
  }
}

describe('Board rules', () => {
  afterEach(async () => {
    await teardown();
  });

  test('Deny when not authencticated', async () => {
    const db = await setup();
    const boardsRef = db.collection('todo-boards');

    const newBoard = {
      name: "Shopping",
      private: true,
      color: "yellow",
      owner: basicUser.uid,

      tasks: {
        name: 'Carrots',
        isDone: false
      }

    }

    await expect(boardsRef.add({
      ...newBoard
    })).toDeny();
  });

  test('Pass when authenticated', async () => {
    const db = await setup(basicUser);
    const boardsRef = db.collection('todo-boards');

    const newBoard = {
      name: "Shopping",
      private: true,
      color: "yellow",
      owner: basicUser.uid,

      tasks: {
        name: 'Carrots',
        isDone: false
      }
    }

    await expect(boardsRef.add({
      ...newBoard
    })).toAllow();
  });

  test('Deny read if board is private, and not owner', async () => {
    const db = await setup(undefined, mockBoardData);
    const boardsRef = db.collection('todo-boards');

    await expect(boardsRef.doc('board1').get()).toDeny();
  });

  test('Allow read if board is public', async () => {
    const db = await setup(undefined, mockBoardData);
    const boardsRef = db.collection('todo-boards');

    await expect(boardsRef.doc('board2').get()).toAllow();
  });

  test('Allow read if youre owner', async () => {
    const db = await setup(basicUser, mockBoardData);
    const boardsRef = db.collection('todo-boards');

    await expect(boardsRef.doc('board1').get()).toAllow();
  })
});