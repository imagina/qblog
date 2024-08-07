<template></template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qblog.entityNames.category"),
        apiRoute: 'apiRoutes.qblog.categories',
        permission: 'iblog.categories',
        extraFormFields: 'iblog.crud-fields.categories',
        create: {
          title: this.$tr('iblog.cms.newCategory'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'},
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
            {
              name: 'status',
              label: this.$tr('isite.cms.form.status'),
              field: 'status',
              align: 'left',
              isTranslatable: true
            },
            {
              name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
              format: val => val ? (val.title ? val.title : '-') : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'parent,qrs'},
          filters: {
            parentId: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.form.parent')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories',
                requestParams: {filter: {status: 1}}
              }
            },
          }
        },
        update: {
          title: this.$tr('iblog.cms.updateCategory'),
          requestParams: {include: 'parent,buildable'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          slug: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          description: {
            name : "description",
            value: '',
            type: 'html',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          metaTitle: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: this.$tr('isite.cms.form.metaTitle'),
            }
          },
          metaDescription: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.metaDescription'),
              type: 'textarea',
              rows: 3
            }
          },
        },
        formRight: {
          status: {
            value: "1",
            type: 'select',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.status')}`,
              clearable: false,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: "1"},
                {label: this.$tr('isite.cms.label.disabled'), value: "0"}
              ]
            }
          },
          masterRecord: {
            value: 0,
            isFakeField: true,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.masterRecord'),
              options: [
                {label: this.$tr('isite.cms.label.yes'), value: 1},
                {label: this.$tr('isite.cms.label.no'), value: 0},
              ]
            }
          },
          parentId: {
            value: 0,
            type: 'treeSelect',
            props: {
              label: this.$tr('isite.cms.form.parent'),
              options: [
                {label: this.$tr('isite.cms.label.disabled'), value: 0},
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qblog.categories',
              select: {label: 'title', id: 'id'},
              requestParams: {include: 'parent', filter: {status: 1}}
            }
          },
          layoutType: {
            name: 'type',
            value: 'general',
            fakeFieldName: 'buildable',
          },
          layoutBuilder: {
            value: null,
            type: 'select',
            name: 'layoutId',
            fakeFieldName: 'buildable',
            props: {
              label: this.$tr('ibuilder.cms.form.layout'),
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qbuilder.layouts',
              select: {label: 'title', id: 'id'},
              requestParams: {
                filter: {
                  type: 'general',
                  entity_type: "Modules\\Iblog\\Entities\\Category"
                }
              }
            }
          },
          showMenu: {
            value: false,
            type: 'checkbox',
            props: {
              label: this.$tr('iblog.cms.form.showInMenu'),
              trueValue: '1',
              falseValue: '0',
            }
          },
          featured: {
            value: '0',
            type: 'checkbox',
            props: {
              label: this.$tr('iblog.cms.form.featured'),
              trueValue: '1',
              falseValue: '0',
            }
          },
          internal: {
            value: '0',
            type: 'checkbox',
            props: {
              label: this.$tr('isite.cms.label.internal'),
              trueValue: '1',
              falseValue: '0',
            }
          },
          sortOrder: {
            value: '0',
            type: 'input',
            props: {
              label: this.$tr('iblog.cms.form.sortOrder'),
              type: 'number'
            }
          },
          mediasSingle: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.firstImage'),
              zone: 'mainimage',
              entity: "Modules\\Iblog\\Entities\\Category",
              entityId: null
            }
          },
          mediasSingle2: {
            name: 'mediasSingle',
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.secondaryImage'),
              zone: 'secondaryimage',
              entity: "Modules\\Iblog\\Entities\\Category",
              entityId: null
            }
          }
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
