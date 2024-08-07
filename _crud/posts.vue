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
        entityName: config("main.qblog.entityNames.post"),
        apiRoute: 'apiRoutes.qblog.posts',
        permission: 'iblog.posts',
        extraFormFields: 'iblog.crud-fields.posts',
        create: {
          title: this.$tr('iblog.cms.newPost'),
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'),
              field: 'id',
              sortable: true,
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
            },
            {
              name: 'slug', label: this.$tr('isite.cms.form.slug'),
              field: 'slug',
              align: 'left',
              sortable: true,
            },
            {
              name: 'statusName',
              label: this.$tr('isite.cms.form.status'),
              field: 'statusName',
              align: 'left', sortable: true
            },
            {
              name: 'category', label: this.$tr('isite.cms.form.category'),
              align: 'left', field: 'category', sortable: true,
              format: val => ((val && val.title) ? val.title : '-')
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          requestParams: {include: 'category,qrs'},
          filters: {
            categories: {
              value: null,
              type: 'treeSelect',
              props: {
                label: this.$tr('isite.cms.label.category')
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.categories'
              }
            },
            status: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.status'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qblog.statuses'
              }
            },
          }
        },
        update: {
          title: this.$tr('iblog.cms.updatePost'),
          requestParams: {include: 'categories,buildable'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
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
            },
          },
          summary: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.summary')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
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
            type: 'input',
            isTranslatable: true,
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
              rows: 2,
            }
          },
          metaKeywords: {
            value: null,
            type: 'select',
            isTranslatable: true,
            props: {
              label: "Meta Keywords",
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique"
            }
          },
          mediasMulti: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.gallery'),
              zone: 'gallery',
              entity: "Modules\\Iblog\\Entities\\Post",
              entityId: null
            }
          },
        },
        formRight: {
          masterRecord: {
            value: '0',
            type: 'select',
            isFakeField: true,
            props: {
              label: this.$tr('isite.cms.form.masterRecord'),
              options: [
                {label: this.$tr('isite.cms.label.yes'), value: '1'},
                {label: this.$tr('isite.cms.label.no'), value: '0'},
              ]
            }
          },
          userId: {
            value: parseInt(this.$store.state.quserAuth.userId),
            type: 'crud',
            props: {
              type: 'select',
              crudData: import('modules/quser/_crud/users'),
              crudProps: {
                label: `${this.$tr('isite.cms.form.author')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
              config: {
                options: {label: 'fullName', value: 'id'},
                requestParams: {filter: {roleSlug: 'author'}}
              },
            },
          },
          categoryId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('modules/qblog/_crud/categories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', filter: {status: 1}}
                }
              },
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
          categories: {
            value: [],
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('modules/qblog/_crud/categories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', filter: {status: 1}}
                }
              },
              crudProps: {
                label: this.$trp('isite.cms.form.category'),
                multiple: true,
                useChips: true
              },
            },
          },
          status: {
            value: '2',
            type: 'select',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.status'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qblog.statuses'
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
          dateAvailable: {
            value: '',
            type: 'date',
            props: {
              label: this.$tr('iblog.cms.form.availableDate'),
            }
          },
          tags: {
            value: [],
            type: 'select',
            //isTranslatable: true,
            props: {
              label: this.$trp('isite.cms.form.tag'),
              useInput: true,
              useChips: true,
              multiple: true,
              hideDropdownIcon: true,
              inputDebounce: "0",
              newValueMode: "add-unique"
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
                  entity_type: "Modules\\Iblog\\Entities\\Post"
                }
              }
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
          mediasSingle: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.image'),
              zone: 'mainimage',
              entity: "Modules\\Iblog\\Entities\\Post",
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
