export interface Chat {
  name: string;
  profilePhoto: string;
  lastmsg: string;
  lastmsgTime: string;
  msgCount: number;
}

export const chats: Chat[] = [
  {
    name: 'Skip Bims',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
    lastmsgTime: '2024-05-20T20:51:53Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Hallie Spenclay',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.',
    lastmsgTime: '2024-08-27T04:53:40Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Moritz Norquay',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    lastmsgTime: '2024-05-28T18:24:22Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Adore Guiness',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.',
    lastmsgTime: '2024-11-16T21:44:19Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Niel Gales',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    lastmsgTime: '2024-02-13T10:37:59Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Olympie Chastagnier',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.',
    lastmsgTime: '2024-05-11T08:48:05Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Lilyan Swires',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    lastmsgTime: '2024-03-28T13:04:13Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Ring Copplestone',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    lastmsgTime: '2024-09-05T23:15:38Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Rodi Gaize',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    lastmsgTime: '2024-04-09T23:30:19Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Lara Yourell',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.',
    lastmsgTime: '2024-01-29T03:01:47Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Skip Bims',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
    lastmsgTime: '2024-05-20T20:51:53Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Hallie Spenclay',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor.',
    lastmsgTime: '2024-08-27T04:53:40Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Moritz Norquay',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    lastmsgTime: '2024-05-28T18:24:22Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Adore Guiness',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.',
    lastmsgTime: '2024-11-16T21:44:19Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Niel Gales',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    lastmsgTime: '2024-02-13T10:37:59Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Olympie Chastagnier',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.',
    lastmsgTime: '2024-05-11T08:48:05Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Lilyan Swires',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    lastmsgTime: '2024-03-28T13:04:13Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Ring Copplestone',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.',
    lastmsgTime: '2024-09-05T23:15:38Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Rodi Gaize',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.',
    lastmsgTime: '2024-04-09T23:30:19Z',
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: 'Lara Yourell',
    profilePhoto: 'https://placehold.co/60@3x.png?font=raleway',
    lastmsg:
      'Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.',
    lastmsgTime: '2024-01-29T03:01:47Z',
    msgCount: Math.floor(Math.random() * 11),
  },
];
