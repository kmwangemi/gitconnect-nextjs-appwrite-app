// const posts = {
//   total: 15,
//   documents: [
//     {
//       content: 'My first post on a Thursday Morning',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f4fc200009432b281e',
//       '$createdAt': '2024-09-26T06:16:00.873+00:00'
//     },
//     {
//       content: 'So wonderful by the way',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f1707e003707d7dd30',
//       '$createdAt': '2024-09-23T13:43:27.551+00:00'
//     },
//     {
//       content: 'my test post with users',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f16bd200048825301d',
//       '$createdAt': '2024-09-23T13:23:30.993+00:00'
//     },
//     {
//       content: 'My latest post',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f1682400287a4c38bf',
//       '$createdAt': '2024-09-23T13:07:49.619+00:00'
//     },
//     {
//       content: 'My Post very now',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f161dd002fc8764a61',
//       '$createdAt': '2024-09-23T12:41:02.336+00:00'
//     },
//     {
//       content: 'lorem 5',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f149040007edb6dfd2',
//       '$createdAt': '2024-09-23T10:55:00.757+00:00'
//     },
//     {
//       content: 'lorem 4',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f148fb00259973370f',
//       '$createdAt': '2024-09-23T10:54:53.705+00:00'
//     },
//     {
//       content: 'lorem 3',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f148f50009d104d04c',
//       '$createdAt': '2024-09-23T10:54:45.931+00:00'
//     },
//     {
//       content: 'lorem 2',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f148ee0011601501f8',
//       '$createdAt': '2024-09-23T10:54:39.478+00:00'
//     },
//     {
//       content: 'lorem 1',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f148e7001b9befa0c3',
//       '$createdAt': '2024-09-23T10:54:32.532+00:00'
//     },
//     {
//       content: 'what about my first post at working on monday afternoon',
//       userId: '66ed90f800169e4ac78f',
//       '$id': '66f13317001ba8221916',
//       '$createdAt': '2024-09-23T09:21:28.018+00:00'
//     }
//   ]
// }
// const likes = {
//   total: 2,
//   documents: [
//     {
//       userId: '66ed90f800169e4ac78f',
//       postId: '66f1707e003707d7dd30',
//       '$id': '66f2a8ec000ec42f34ae',
//       '$createdAt': '2024-09-24T11:56:28.385+00:00',
//       '$updatedAt': '2024-09-24T11:56:28.385+00:00',
//       '$permissions': [],
//       post: null,
//       '$databaseId': '66ed87e3002b7a02551d',
//       '$collectionId': '66f285e8002c9747000f'
//     },
//     {
//       userId: '66ed90f800169e4ac78f',
//       postId: '66f148e7001b9befa0c3',
//       '$id': '66f2b18e00211dc5fef4',
//       '$createdAt': '2024-09-24T12:33:18.713+00:00',
//       '$updatedAt': '2024-09-24T12:33:18.713+00:00',
//       '$permissions': [],
//       post: null,
//       '$databaseId': '66ed87e3002b7a02551d',
//       '$collectionId': '66f285e8002c9747000f'
//     }
//   ]
// }
// const comments = { total: 0, documents: [] }
// const postsWithDetails = [
//   {
//     content: 'My first post on a Thursday Morning',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f4fc200009432b281e',
//     '$createdAt': '2024-09-26T06:16:00.873+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'So wonderful by the way',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f1707e003707d7dd30',
//     '$createdAt': '2024-09-23T13:43:27.551+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 1, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'my test post with users',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f16bd200048825301d',
//     '$createdAt': '2024-09-23T13:23:30.993+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'My latest post',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f1682400287a4c38bf',
//     '$createdAt': '2024-09-23T13:07:49.619+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'My Post very now',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f161dd002fc8764a61',
//     '$createdAt': '2024-09-23T12:41:02.336+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'lorem 5',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f149040007edb6dfd2',
//     '$createdAt': '2024-09-23T10:55:00.757+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'lorem 4',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f148fb00259973370f',
//     '$createdAt': '2024-09-23T10:54:53.705+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'lorem 3',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f148f50009d104d04c',
//     '$createdAt': '2024-09-23T10:54:45.931+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'lorem 2',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f148ee0011601501f8',
//     '$createdAt': '2024-09-23T10:54:39.478+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'lorem 1',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f148e7001b9befa0c3',
//     '$createdAt': '2024-09-23T10:54:32.532+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 1, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   },
//   {
//     content: 'what about my first post at working on monday afternoon',
//     userId: '66ed90f800169e4ac78f',
//     '$id': '66f13317001ba8221916',
//     '$createdAt': '2024-09-23T09:21:28.018+00:00',
//     user: {
//       '$id': '66ed90f800169e4ac78f',
//       userName: 'kmwas',
//       avatarUrl: null
//     },
//     likes: { count: 0, isLikedByUser: false },
//     comments: { count: 0, items: [] }
//   }
// ]
