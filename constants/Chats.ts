export interface Chat {
  name: string;
  profilePhoto: string;
  lastmsg?: string;
  lastmsgTime?: string;
  msgCount: number;
}

export const chats: Chat[] = [
  {
    name: "Skip Bims",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-05-20T20:51:53Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Hallie Spenclay",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-08-27T04:53:40Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Moritz Norquay",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-05-28T18:24:22Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Adore Guiness",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-11-16T21:44:19Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Niel Gales",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-02-13T10:37:59Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Olympie Chastagnier",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-05-11T08:48:05Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Lilyan Swires",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-03-28T13:04:13Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Ring Copplestone",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Etiam pretium iaculis justo. In hac habitasse platea dictumst." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-09-05T23:15:38Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Rodi Gaize",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-04-09T23:30:19Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
  {
    name: "Lara Yourell",
    profilePhoto: "https://i.pravatar.cc/300",
    lastmsg: Math.random() > 0.2 ? "Suspendisse ornare consequat lectus. In est risus, auctor sed." : undefined,
    lastmsgTime: Math.random() > 0.2 ? "2024-01-29T03:01:47Z" : undefined,
    msgCount: Math.floor(Math.random() * 11),
  },
];
