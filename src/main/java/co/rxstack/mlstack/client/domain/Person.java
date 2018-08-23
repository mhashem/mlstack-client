package co.rxstack.mlstack.client.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * A Person.
 */
@Entity
@Table(name = "person")
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "info")
    private String info;

    @Column(name = "dob")
    private LocalDate dob;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "face_id_1")
    private String faceId1;

    @Column(name = "face_id_2")
    private String faceId2;

    @Column(name = "owner")
    private String owner;

	@Transient
	@JsonSerialize
	@JsonDeserialize
	private int facesCount = 0;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Person name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public Person address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getInfo() {
        return info;
    }

    public Person info(String info) {
        this.info = info;
        return this;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Person dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public byte[] getImage() {
        return image;
    }

    public Person image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Person imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getFaceId1() {
        return faceId1;
    }

    public Person faceId1(String faceId1) {
        this.faceId1 = faceId1;
        return this;
    }

    public void setFaceId1(String faceId1) {
        this.faceId1 = faceId1;
    }

    public String getFaceId2() {
        return faceId2;
    }

    public Person faceId2(String faceId2) {
        this.faceId2 = faceId2;
        return this;
    }

    public void setFaceId2(String faceId2) {
        this.faceId2 = faceId2;
    }

    public String getOwner() {
        return owner;
    }

    public Person owner(String owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

	public String getCloudIndexIdentifier() {
    	return getId() + "#" + getName();
	}

	public int getFacesCount() {
		return facesCount;
	}

	public void setFacesCount(int facesCount) {
		this.facesCount = facesCount;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Person person = (Person) o;
        if (person.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), person.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", address='" + getAddress() + "'" +
            ", info='" + getInfo() + "'" +
            ", dob='" + getDob() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", faceId1='" + getFaceId1() + "'" +
            ", faceId2='" + getFaceId2() + "'" +
            ", owner='" + getOwner() + "'" +
            "}";
    }
}
