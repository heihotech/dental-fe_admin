export const menuItems = [
    {
        id: 1,
        label: "menuitems.menu.text",
        isTitle: true
    },
    {
        id: 2,
        label: "menuitems.dashboard.text",
        icon: "uil-home-alt",
        badge: {
            variant: "info",
            text: "menuitems.dashboard.badge"
        },
        link: "/"
    },
    {
        id: 3,
        label: "menuitems.apps.text",
        isTitle: true
    },
    {
        id: 4,
        label: "menuitems.calendar.text",
        icon: "uil-calender",
        link: "/"
    },
    {
        id: 5,
        label: "menuitems.chat.text",
        icon: "uil-comments-alt",
        link: "/",
        badge: {
            variant: "warning",
            text: "menuitems.chat.badge"
        }
    },
    {
        id: 6,
        label: "menuitems.ecommerce.text",
        icon: "uil-store",
        subItems: [
            {
                id: 7,
                label: "menuitems.ecommerce.list.products",
                link: "/",
                parentId: 6
            },
            {
                id: 8,
                label: "menuitems.ecommerce.list.productdetail",
                link: "/",
                parentId: 6
            },
            {
                id: 9,
                label: "menuitems.ecommerce.list.orders",
                link: "/",
                parentId: 6
            },
            {
                id: 10,
                label: "menuitems.ecommerce.list.customers",
                link: "/",
                parentId: 6
            },
            {
                id: 11,
                label: "menuitems.ecommerce.list.cart",
                link: "/",
                parentId: 6
            },
            {
                id: 12,
                label: "menuitems.ecommerce.list.checkout",
                link: "/",
                parentId: 6
            },
            {
                id: 13,
                label: "menuitems.ecommerce.list.shops",
                link: "/",
                parentId: 6
            },
            {
                id: 14,
                label: "menuitems.ecommerce.list.addproduct",
                link: "/",
                parentId: 6
            }
        ]
    },
    {
        id: 15,
        label: "menuitems.email.text",
        icon: "uil-envelope",
        subItems: [
            {
                id: 16,
                label: "menuitems.email.list.inbox",
                link: "/",
                parentId: 15
            },
            {
                id: 17,
                label: "menuitems.email.list.reademail",
                link: "/",
                parentId: 15
            }
        ]
    },
    {
        id: 18,
        label: "menuitems.invoices.text",
        icon: "uil-invoice",
        subItems: [
            {
                id: 19,
                label: "menuitems.invoices.list.invoicelist",
                link: "/",
                parentId: 18
            },
            {
                id: 20,
                label: "menuitems.invoices.list.invoicedetail",
                link: "/",
                parentId: 18
            }
        ]
    },
    {
        id: 21,
        label: "menuitems.contacts.text",
        icon: "uil-book-alt",
        subItems: [
            {
                id: 22,
                label: "menuitems.contacts.list.usergrid",
                link: "/",
                parentId: 21
            },
            {
                id: 23,
                label: "menuitems.contacts.list.userlist",
                link: "/",
                parentId: 21
            },
            {
                id: 24,
                label: "menuitems.contacts.list.profile",
                link: "/",
                parentId: 21
            }
        ]
    },
    {
        id: 25,
        label: "menuitems.pages.text",
        isTitle: true
    },
    {
        id: 26,
        label: "menuitems.authentication.text",
        icon: "uil-user-circle",
        subItems: [
            {
                id: 27,
                label: "menuitems.authentication.list.login",
                link: "/",
                parentId: 26
            },
            {
                id: 28,
                label: "menuitems.authentication.list.register",
                link: "/",
                parentId: 26
            },
            {
                id: 29,
                label: "menuitems.authentication.list.recoverpwd",
                link: "/",
                parentId: 26
            },
            {
                id: 30,
                label: "menuitems.authentication.list.lockscreen",
                link: "/",
                parentId: 26
            }
        ]
    },
    {
        id: 31,
        label: "menuitems.utility.text",
        icon: "uil-file-alt",
        subItems: [
            {
                id: 32,
                label: "menuitems.utility.list.starter",
                link: "/",
                parentId: 31
            },
            {
                id: 33,
                label: "menuitems.utility.list.maintenance",
                link: "/",
                parentId: 31
            },
            {
                id: 35,
                label: "menuitems.utility.list.comingsoon",
                link: "/",
                parentId: 31
            },
            {
                id: 36,
                label: "menuitems.utility.list.timeline",
                link: "/",
                parentId: 31
            },
            {
                id: 37,
                label: "menuitems.utility.list.faqs",
                link: "/",
                parentId: 31
            },
            {
                id: 38,
                label: "menuitems.utility.list.pricing",
                link: "/",
                parentId: 31
            },
            {
                id: 39,
                label: "menuitems.utility.list.error404",
                link: "/",
                parentId: 31
            },
            {
                id: 40,
                label: "menuitems.utility.list.error500",
                link: "/",
                parentId: 31
            }
        ]
    },
    {
        id: 41,
        label: "menuitems.components.text",
        isTitle: true
    },
    {
        id: 42,
        label: "menuitems.uielements.text",
        icon: "uil-flask",
        subItems: [
            {
                id: 43,
                label: "menuitems.uielements.list.alerts",
                link: "/",
                parentId: 42
            },
            {
                id: 44,
                label: "menuitems.uielements.list.buttons",
                link: "/",
                parentId: 42
            },
            {
                id: 45,
                label: "menuitems.uielements.list.cards",
                link: "/",
                parentId: 42
            },
            {
                id: 46,
                label: "menuitems.uielements.list.carousel",
                link: "/",
                parentId: 42
            },
            {
                id: 47,
                label: "menuitems.uielements.list.dropdowns",
                link: "/",
                parentId: 42
            },
            {
                id: 48,
                label: "menuitems.uielements.list.grid",
                link: "/",
                parentId: 42
            },
            {
                id: 49,
                label: "menuitems.uielements.list.images",
                link: "/",
                parentId: 42
            },
            {
                id: 50,
                label: "menuitems.uielements.list.lightbox",
                link: "/",
                parentId: 42
            },
            {
                id: 51,
                label: "menuitems.uielements.list.modals",
                link: "/",
                parentId: 42
            },
            {
                id: 52,
                label: "menuitems.uielements.list.rangeslider",
                link: "/",
                parentId: 42
            },
            {
                id: 53,
                label: "menuitems.uielements.list.progressbar",
                link: "/",
                parentId: 42
            },
            {
                id: 54,
                label: "menuitems.uielements.list.sweetalert",
                link: "/",
                parentId: 42
            },
            {
                id: 55,
                label: "menuitems.uielements.list.tabs",
                link: "/",
                parentId: 42
            },
            {
                id: 56,
                label: "menuitems.uielements.list.typography",
                link: "/",
                parentId: 42
            },
            {
                id: 57,
                label: "menuitems.uielements.list.video",
                link: "/",
                parentId: 42
            },
            {
                id: 58,
                label: "menuitems.uielements.list.general",
                link: "/",
                parentId: 42
            },
            {
                id: 59,
                label: "menuitems.uielements.list.colors",
                link: "/",
                parentId: 42
            },
            {
                id: 60,
                label: "menuitems.uielements.list.rating",
                link: "/",
                parentId: 42
            },
            {
                id: 61,
                label: "menuitems.uielements.list.notifications",
                link: "/",
                parentId: 42
            }
        ]
    },
    {
        id: 62,
        label: "menuitems.forms.text",
        icon: "uil-shutter-alt",
        badge: {
            variant: "danger",
            text: 'menuitems.forms.badge'
        },
        subItems: [
            {
                id: 63,
                label: "menuitems.forms.list.elements",
                link: "/",
                parentId: 62
            },
            {
                id: 64,
                label: "menuitems.forms.list.validation",
                link: "/",
                parentId: 62
            },
            {
                id: 65,
                label: "menuitems.forms.list.advanced",
                link: "/",
                parentId: 62
            },
            {
                id: 66,
                label: "menuitems.forms.list.editor",
                link: "/",
                parentId: 62
            },
            {
                id: 67,
                label: "menuitems.forms.list.fileupload",
                link: "/",
                parentId: 62
            },
            {
                id: 68,
                label: "menuitems.forms.list.repeater",
                link: "/",
                parentId: 62
            },
            {
                id: 69,
                label: "menuitems.forms.list.wizard",
                link: "/",
                parentId: 62
            },
            {
                id: 70,
                label: "menuitems.forms.list.mask",
                link: "/",
                parentId: 62
            }
        ]
    },
    {
        id: 71,
        icon: "uil-list-ul",
        label: "menuitems.tables.text",
        subItems: [
            {
                id: 72,
                label: "menuitems.tables.list.basic",
                link: "/",
                parentId: 71
            },
            {
                id: 73,
                label: "menuitems.tables.list.advanced",
                link: "/",
                parentId: 71
            }
        ]
    },
    {
        id: 74,
        icon: "uil-chart",
        label: "menuitems.charts.text",
        subItems: [
            {
                id: 75,
                label: "menuitems.charts.list.apex",
                link: "/",
                parentId: 74
            },
            {
                id: 76,
                label: "menuitems.charts.list.chartjs",
                link: "/",
                parentId: 74
            },
            {
                id: 77,
                label: "menuitems.charts.list.chartist",
                link: "/",
                parentId: 74
            },
            {
                id: 78,
                label: "menuitems.charts.list.echart",
                link: "/",
                parentId: 74
            }
        ]
    },
    {
        id: 79,
        label: "menuitems.icons.text",
        icon: "uil-streering",
        subItems: [
            {
                id: 80,
                label: "menuitems.icons.list.unicons",
                link: "/",
                parentId: 79
            },
            {
                id: 81,
                label: "menuitems.icons.list.boxicons",
                link: "/",
                parentId: 79
            },
            {
                id: 82,
                label: "menuitems.icons.list.materialdesign",
                link: "/",
                parentId: 79
            },
            {
                id: 83,
                label: "menuitems.icons.list.dripicons",
                link: "/",
                parentId: 79
            },
            {
                id: 84,
                label: "menuitems.icons.list.fontawesome",
                link: "/",
                parentId: 79
            }
        ]
    },
    {
        id: 85,
        label: "menuitems.maps.text",
        icon: "uil-location-point",
        subItems: [
            {
                id: 86,
                label: "menuitems.maps.list.googlemap",
                link: "/",
                parentId: 85
            },
            {
                id: 87,
                label: "menuitems.maps.list.leafletmap",
                link: "/",
                parentId: 85
            },
        ]
    },
    {
        id: 88,
        label: "menuitems.multilevel.text",
        icon: "uil-share-alt",
        subItems: [
            {
                id: 89,
                label: "menuitems.multilevel.list.level1.1",
                link: "javascript: void(0);",
                parentId: 88
            },
            {
                id: 90,
                label: "menuitems.multilevel.list.level1.2",
                parentId: 88,
                subItems: [
                    {
                        id: 91,
                        label: "menuitems.multilevel.list.level1.level2.1",
                        link: "javascript: void(0);",
                        parentId: 88
                    },
                    {
                        id: 92,
                        label: "menuitems.multilevel.list.level1.level2.2",
                        link: "/level2.2",
                        parentId: 88
                    }
                ]
            }
        ]
    }
];

